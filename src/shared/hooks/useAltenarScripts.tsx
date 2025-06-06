import { useEffect } from "react";

export const useAltenarScripts = () => {
  useEffect(() => {
    const basePath =
      process.env.NODE_ENV === "development"
        ? "/lvds"
        : process.env.PUBLIC_URL || "/lvds";

    const addScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `${basePath}/libs/${src}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Fallo en ${src}`));
        document.body.appendChild(script);
      });

    const loadScripts = async () => {
      try {
        await addScript("cdk.js");
        await addScript("common.js");
        console.log("✅ Scripts Altenar cargados");
      } catch (e) {
        console.error("❌ Error cargando scripts Altenar", e);
      }
    };

    loadScripts();
  }, []);
};
