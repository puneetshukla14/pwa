import ClientSidebarLayout from './ClientSidebarLayout'

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  return <ClientSidebarLayout>{children}</ClientSidebarLayout>
}
