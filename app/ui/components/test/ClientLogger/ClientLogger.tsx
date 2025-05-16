"use client";

import { Term } from "@/app/lib/db/definitions";
import { useEffect } from "react";

export default function ClientLogger({ term }: { term: Term | null }) {
    useEffect(() => {
        console.log("Term data received on client:", term);
    }, [term]);

    return null;
}