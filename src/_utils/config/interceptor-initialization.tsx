"use client";

import { useEffect } from "react";

import setup from "@/_utils/config/axios-interceptors";

export default function InterceptorInitialization() {
  useEffect(() => setup(), []);
  return null;
}
