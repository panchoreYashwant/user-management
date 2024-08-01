import Sidebar from "@/app/components/Layout/Sidebar";
import Topbar from "@/app/components/Layout/Topbar";
import { Layout } from "antd";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout>
            <Topbar />
            <Layout style={{ padding: "0 50px", marginTop: 64 }}>
              {children}
            </Layout>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
