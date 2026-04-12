"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { cleanupOrphans } from "@/lib/cleanup-orphans";

const BUCKET = "property-images";
const LIMIT_BYTES = 1024 * 1024 * 1024; // 1 GB

interface StorageUsage {
  usedBytes: number;
  limitBytes: number;
  percentage: number;
  loading: boolean;
}

export function useStorageUsage(): StorageUsage {
  const [usedBytes, setUsedBytes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculate = async () => {
      try { await cleanupOrphans(); } catch {}
      let total = 0;

      // List all files in the bucket across known prefixes (non-recursive, so list subfolders explicitly)
      for (const prefix of ["properties", "properties/videos", "epc"]) {
        let offset = 0;
        const pageSize = 1000;
        let hasMore = true;

        while (hasMore) {
          const { data } = await supabase.storage
            .from(BUCKET)
            .list(prefix, { limit: pageSize, offset });

          if (!data || data.length === 0) {
            hasMore = false;
            break;
          }

          for (const file of data) {
            const size = file.metadata?.size ?? 0;
            total += typeof size === "number" ? size : 0;
          }

          if (data.length < pageSize) {
            hasMore = false;
          } else {
            offset += pageSize;
          }
        }
      }

      setUsedBytes(total);
      setLoading(false);
    };

    calculate();
  }, []);

  const percentage = Math.min((usedBytes / LIMIT_BYTES) * 100, 100);

  return { usedBytes, limitBytes: LIMIT_BYTES, percentage, loading };
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
