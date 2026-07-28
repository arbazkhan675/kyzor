import { permanentRedirect } from "next/navigation";

export default function AutomationsPage() {
  permanentRedirect("/?service=automation");
}
