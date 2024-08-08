import { useEffect, useState } from "react";

export default function App() {
  const [appInfo, setAppInfo] = useState<API.AppAddRequest>({});
  return { appInfo, setAppInfo };
}
