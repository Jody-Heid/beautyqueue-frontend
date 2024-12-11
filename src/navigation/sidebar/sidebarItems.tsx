import { 
  Users, 
  Calendar, 
  Settings, 
  Building2, 
  UserCog,
  Shield,
  PanelsTopLeft,
  BellRing,
  XCircle,
  LucideIcon
} from "lucide-react"

export interface NavSubItem {
  title: string
  path: string
}

export interface NavMainItem {
  title: string
  path: string
  icon?: LucideIcon
  isActive?: boolean
  subItems?: NavSubItem[]
}

export interface NavGroup {
  id: number
  label: string
  items: NavMainItem[]
}

const basePath = "/dashboard"

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        path: basePath,
        icon: PanelsTopLeft,
        isActive: true,
      },
    ],
  },
  {
    id: 2,
    label: "Appointments",
    items: [
      {
        title: "Appointments",
        path: `${basePath}/appointments`,
        icon: Calendar,
        subItems: [
          { title: "New", path: `${basePath}/appointments/new` },
          { title: "All Appointments", path: `${basePath}/appointments/all` },
          { title: "Failed Jobs", path: `${basePath}/appointments/failed` },
        ]
      },
    ],
  },
  {
    id: 3,
    label: "User Management",
    items: [
      {
        title: "Users",
        path: `${basePath}/users`,
        icon: Users,
      },
      {
        title: "Staff",
        path: `${basePath}/staff`,
        icon: UserCog,
      },
      {
        title: "Tenants",
        path: `${basePath}/tenants`,
        icon: Building2,
      }
    ],
  },
  {
    id: 4,
    label: "Access Control",
    items: [
      {
        title: "Roles & Permissions",
        path: "#",
        icon: Shield,
        subItems: [
          { title: "Roles", path: `${basePath}/roles` },
          { title: "Permissions", path: `${basePath}/permissions` },
          { title: "Role Permissions", path: `${basePath}/role-permissions` },
        ]
      },
      {
        title: "Access Tokens",
        path: `${basePath}/personal-tokens`,
        icon: Settings
      },
    ],
  },
  {
    id: 5,
    label: "Services",
    items: [
      {
        title: "Offered Services",
        path: `${basePath}/services`,
        icon: BellRing,
      },
      {
        title: "Failed Jobs",
        path: `${basePath}/failed-jobs`,
        icon: XCircle,
      }
    ],
  }
]