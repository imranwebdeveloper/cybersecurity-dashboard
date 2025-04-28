"use client";

import { useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  ChevronDown,
  Clock,
  FileWarning,
  Filter,
  Home,
  Lock,
  type LucideIcon,
  Menu,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SecurityChart } from "./security-chart";
import { ThreatMap } from "./threat-map";
import { AttackVectorsChart } from "./attack-vectors-chart";
import { VulnerabilityPieChart } from "./vulnerability-pie-chart";
import { AttackHeatmapChart } from "./attack-heatmap-chart";
import { SystemHealthGauge } from "./system-health-gauge";

// Dummy data for the dashboard
const securityIncidents = [
  {
    id: "INC-001",
    type: "Malware",
    severity: "High",
    source: "Endpoint",
    timestamp: "2025-04-28T07:32:14",
    status: "Open",
    affectedSystems: "Workstation-104, Server-DB2",
  },
  {
    id: "INC-002",
    type: "Phishing",
    severity: "Medium",
    source: "Email Gateway",
    timestamp: "2025-04-28T06:45:22",
    status: "Investigating",
    affectedSystems: "User accounts (3)",
  },
  {
    id: "INC-003",
    type: "Unauthorized Access",
    severity: "Critical",
    source: "Cloud Service",
    timestamp: "2025-04-28T05:12:09",
    status: "Mitigated",
    affectedSystems: "AWS S3 Bucket",
  },
  {
    id: "INC-004",
    type: "DDoS",
    severity: "High",
    source: "Network",
    timestamp: "2025-04-27T23:56:41",
    status: "Resolved",
    affectedSystems: "Public API",
  },
  {
    id: "INC-005",
    type: "Data Exfiltration",
    severity: "Critical",
    source: "DLP System",
    timestamp: "2025-04-27T22:18:33",
    status: "Investigating",
    affectedSystems: "Marketing Database",
  },
  {
    id: "INC-006",
    type: "Suspicious Login",
    severity: "Medium",
    source: "IAM",
    timestamp: "2025-04-27T20:05:17",
    status: "Resolved",
    affectedSystems: "Admin Portal",
  },
];

// Navigation items for the sidebar
interface NavItem {
  title: string;
  icon: LucideIcon;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { title: "Dashboard", icon: Home, href: "#", badge: 0 },
  { title: "Incidents", icon: AlertTriangle, href: "#", badge: 5 },
  { title: "Assets", icon: Shield, href: "#", badge: 0 },
  { title: "Vulnerabilities", icon: FileWarning, href: "#", badge: 12 },
  { title: "Users", icon: Users, href: "#", badge: 0 },
  { title: "Reports", icon: BarChart3, href: "#", badge: 0 },
  { title: "Settings", icon: Settings, href: "#", badge: 0 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="p-6 border-b">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                <span className="text-xl font-bold tracking-tight">
                  SecureGuard
                </span>
              </div>
            </div>
            <nav className="px-2 py-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                    {item.badge > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </a>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t">
                <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground">
                  SETTINGS
                </div>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <User className="h-5 w-5" />
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <Lock className="h-5 w-5" />
                  Logout
                </a>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center md:flex hidden gap-2">
          <Shield className="h-6 w-6" />
          <span className="text-xl font-bold  tracking-tight">SecureGuard</span>
        </div>
        <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search incidents..."
                className="w-full rounded-lg bg-background pl-8 md:w-[240px] lg:w-[280px]"
              />
            </div>
          </form>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              4
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="gap-1">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline-flex">Admin</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm">
            <h2 className="text-lg font-semibold flex items-center gap-2 py-2">
              <Shield className="h-5 w-5" />
              SecureGuard
            </h2>
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.title}
                {item.badge > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </a>
            ))}
          </nav>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 lg:gap-8 lg:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">
              Security Dashboard
            </h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 hidden sm:flex"
              >
                <Clock className="h-3.5 w-3.5" />
                <span>Last updated: 2 minutes ago</span>
              </Button>
              <Button size="sm" className="h-8 gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Run Security Scan</span>
                <span className="sm:hidden">Scan</span>
              </Button>
            </div>
          </div>
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <TabsList className="w-full sm:w-auto overflow-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="incidents">Incidents</TabsTrigger>
                <TabsTrigger value="threats">Threat Map</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <div className="hidden sm:flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
                    <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                    <DropdownMenuItem>Custom range</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Security Score
                    </CardTitle>
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">82/100</div>
                    <p className="text-xs text-muted-foreground">
                      +4 from last week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Incidents
                    </CardTitle>
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">
                      +2 since yesterday
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Vulnerabilities
                    </CardTitle>
                    <FileWarning className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      3 critical, 9 high
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Protected Assets
                    </CardTitle>
                    <Lock className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">142</div>
                    <p className="text-xs text-muted-foreground">
                      98% coverage
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Security Events (24h)</CardTitle>
                    <CardDescription>
                      Real-time monitoring of security events across your
                      infrastructure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <SecurityChart />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Incidents</CardTitle>
                    <CardDescription>
                      Latest security incidents requiring attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {securityIncidents.slice(0, 3).map((incident) => (
                        <div
                          key={incident.id}
                          className="flex items-start gap-4"
                        >
                          <div className="rounded-full p-1">
                            <ShieldAlert
                              className={`h-5 w-5 ${
                                incident.severity === "Critical"
                                  ? "text-red-500"
                                  : incident.severity === "High"
                                  ? "text-amber-500"
                                  : "text-yellow-500"
                              }`}
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {incident.type}
                              <Badge
                                variant={
                                  incident.severity === "Critical"
                                    ? "destructive"
                                    : incident.severity === "High"
                                    ? "default"
                                    : "secondary"
                                }
                                className="ml-2"
                              >
                                {incident.severity}
                              </Badge>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {incident.id} • {incident.source} •{" "}
                              {new Date(
                                incident.timestamp
                              ).toLocaleTimeString()}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setActiveTab("incidents")}
                    >
                      View All Incidents
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="incidents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Incidents</CardTitle>
                  <CardDescription>
                    A comprehensive list of all security incidents detected in
                    your environment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Severity</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Affected Systems</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {securityIncidents.map((incident) => (
                          <TableRow key={incident.id}>
                            <TableCell className="font-medium">
                              {incident.id}
                            </TableCell>
                            <TableCell>{incident.type}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  incident.severity === "Critical"
                                    ? "destructive"
                                    : incident.severity === "High"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {incident.severity}
                              </Badge>
                            </TableCell>
                            <TableCell>{incident.source}</TableCell>
                            <TableCell>
                              {new Date(incident.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  incident.status === "Open" ||
                                  incident.status === "Investigating"
                                    ? "outline"
                                    : incident.status === "Mitigated"
                                    ? "secondary"
                                    : "default"
                                }
                              >
                                {incident.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{incident.affectedSystems}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="threats" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Global Threat Map</CardTitle>
                  <CardDescription>
                    Real-time visualization of attack origins and targets across
                    your infrastructure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] overflow-hidden rounded-lg border bg-muted/50">
                    <ThreatMap />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-full bg-red-500"></span>
                      <span className="text-xs text-muted-foreground">
                        Attack Source
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                      <span className="text-xs text-muted-foreground">
                        Target
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                      <span className="text-xs text-muted-foreground">
                        Active Attack
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download Report
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-full md:col-span-1 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Attack Vectors (Last 30 Days)</CardTitle>
                    <CardDescription>
                      Distribution of attack types by frequency
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <AttackVectorsChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Vulnerability Severity</CardTitle>
                    <CardDescription>
                      Distribution by severity level
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center pt-4">
                    <VulnerabilityPieChart />
                  </CardContent>
                </Card>
                <Card className="col-span-full md:col-span-2 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Attack Frequency by Time</CardTitle>
                    <CardDescription>
                      Heatmap of attack frequency by hour and day
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AttackHeatmapChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>Current security posture</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center pt-4">
                    <SystemHealthGauge />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
