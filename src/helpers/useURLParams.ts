import { useLocation } from "react-router-dom";

export default function useURLParams() {
  return new URLSearchParams(useLocation().search);
}
