import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Settings, BarChart3, Shield, FlaskConical, Trash2, Plus, Globe, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { GeoConfig, GeoAnalytics, IpWhitelist, AbTestConfig } from "@shared/schema";

function ConfigPanel() {
  const { toast } = useToast();
  const { data: config, isLoading } = useQuery<GeoConfig>({
    queryKey: ["/api/config"],
  });

  const [redirectUrl, setRedirectUrl] = useState("");
  const [countries, setCountries] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [mobileOnly, setMobileOnly] = useState(false);

  useEffect(() => {
    if (config) {
      setRedirectUrl(config.redirectUrl || "");
      setCountries(config.redirectCountries?.join(", ") || "");
      setIsActive(config.isActive ?? true);
      setMobileOnly(config.mobileOnly ?? false);
    }
  }, [config]);

  const updateMutation = useMutation({
    mutationFn: async (data: { redirectUrl: string; redirectCountries: string[]; isActive: boolean; mobileOnly: boolean }) => {
      return apiRequest("PUT", "/api/config", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/config"] });
      toast({ title: "Configuration updated", description: "Your settings have been saved." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update configuration.", variant: "destructive" });
    },
  });

  const handleSave = () => {
    const countryCodes = countries.split(",").map(c => c.trim().toUpperCase()).filter(c => c.length === 2);
    updateMutation.mutate({
      redirectUrl: redirectUrl || config?.redirectUrl || "https://google.com",
      redirectCountries: countryCodes.length > 0 ? countryCodes : config?.redirectCountries || ["KW", "JO"],
      isActive,
      mobileOnly,
    });
  };

  if (isLoading) {
    return <div className="p-4 text-muted-foreground">Loading configuration...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Redirect Configuration
        </CardTitle>
        <CardDescription>Configure where users from specific countries are redirected</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <Label>Redirect Active</Label>
            <p className="text-sm text-muted-foreground">Enable or disable geo-redirects</p>
          </div>
          <Switch
            checked={isActive}
            onCheckedChange={setIsActive}
            data-testid="switch-redirect-active"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <Label>Mobile Only</Label>
            <p className="text-sm text-muted-foreground">Only redirect users on mobile devices</p>
          </div>
          <Switch
            checked={mobileOnly}
            onCheckedChange={setMobileOnly}
            data-testid="switch-mobile-only"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="redirectUrl">Redirect URL</Label>
          <Input
            id="redirectUrl"
            placeholder={config?.redirectUrl || "https://google.com"}
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
            data-testid="input-redirect-url"
          />
          <p className="text-sm text-muted-foreground">
            Current: {config?.redirectUrl || "https://google.com"}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="countries">Target Countries (ISO codes, comma-separated)</Label>
          <Input
            id="countries"
            placeholder={config?.redirectCountries?.join(", ") || "KW, JO"}
            value={countries}
            onChange={(e) => setCountries(e.target.value)}
            data-testid="input-countries"
          />
          <p className="text-sm text-muted-foreground">
            Current: {config?.redirectCountries?.join(", ") || "KW, JO"}
          </p>
        </div>

        <Button onClick={handleSave} disabled={updateMutation.isPending} data-testid="button-save-config">
          {updateMutation.isPending ? "Saving..." : "Save Configuration"}
        </Button>
      </CardContent>
    </Card>
  );
}

function AnalyticsPanel() {
  const { data: analytics, isLoading: analyticsLoading } = useQuery<GeoAnalytics[]>({
    queryKey: ["/api/analytics"],
  });

  const { data: summary, isLoading: summaryLoading } = useQuery<{ countryCode: string; count: number; redirected: number }[]>({
    queryKey: ["/api/analytics/summary"],
  });

  if (analyticsLoading || summaryLoading) {
    return <div className="p-4 text-muted-foreground">Loading analytics...</div>;
  }

  const totalVisits = summary?.reduce((acc, s) => acc + s.count, 0) || 0;
  const totalRedirects = summary?.reduce((acc, s) => acc + s.redirected, 0) || 0;
  const redirectRate = totalVisits > 0 ? ((totalRedirects / totalVisits) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold" data-testid="text-total-visits">{totalVisits}</div>
            <p className="text-sm text-muted-foreground">Total Visits</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold" data-testid="text-total-redirects">{totalRedirects}</div>
            <p className="text-sm text-muted-foreground">Redirected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold" data-testid="text-redirect-rate">{redirectRate}%</div>
            <p className="text-sm text-muted-foreground">Redirect Rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Visitors by Country
          </CardTitle>
        </CardHeader>
        <CardContent>
          {summary && summary.length > 0 ? (
            <div className="space-y-3">
              {summary.map((item) => (
                <div key={item.countryCode} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" data-testid={`badge-country-${item.countryCode}`}>
                      {item.countryCode}
                    </Badge>
                    <span className="text-sm">{item.count} visits</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.redirected} redirected
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No analytics data yet</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {analytics && analytics.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {analytics.slice(0, 20).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between gap-4 text-sm py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={entry.wasRedirected ? "destructive" : "secondary"} className="text-xs">
                      {entry.countryCode || "Unknown"}
                    </Badge>
                    <span className="text-muted-foreground truncate max-w-[200px]">
                      {entry.ipAddress}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {entry.wasRedirected ? "Redirected" : "Allowed"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No recent activity</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function WhitelistPanel() {
  const { toast } = useToast();
  const [newIp, setNewIp] = useState("");
  const [description, setDescription] = useState("");

  const { data: whitelist, isLoading } = useQuery<IpWhitelist[]>({
    queryKey: ["/api/whitelist"],
  });

  const addMutation = useMutation({
    mutationFn: async (data: { ipAddress: string; description?: string }) => {
      return apiRequest("POST", "/api/whitelist", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/whitelist"] });
      setNewIp("");
      setDescription("");
      toast({ title: "IP added", description: "The IP address has been whitelisted." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add IP to whitelist.", variant: "destructive" });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/whitelist/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/whitelist"] });
      toast({ title: "IP removed", description: "The IP address has been removed from whitelist." });
    },
  });

  const handleAdd = () => {
    if (!newIp.trim()) return;
    addMutation.mutate({ ipAddress: newIp.trim(), description: description.trim() || undefined });
  };

  if (isLoading) {
    return <div className="p-4 text-muted-foreground">Loading whitelist...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          IP Whitelist
        </CardTitle>
        <CardDescription>IPs on this list will never be redirected</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="IP Address (e.g., 192.168.1.1)"
            value={newIp}
            onChange={(e) => setNewIp(e.target.value)}
            className="flex-1 min-w-[200px]"
            data-testid="input-whitelist-ip"
          />
          <Input
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 min-w-[150px]"
            data-testid="input-whitelist-desc"
          />
          <Button onClick={handleAdd} disabled={addMutation.isPending} data-testid="button-add-whitelist">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {whitelist && whitelist.length > 0 ? (
          <div className="space-y-2">
            {whitelist.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between gap-4 p-3 bg-muted/50 rounded-md">
                <div className="flex items-center gap-2 flex-wrap">
                  <code className="text-sm font-mono" data-testid={`text-whitelist-ip-${entry.id}`}>
                    {entry.ipAddress}
                  </code>
                  {entry.description && (
                    <span className="text-sm text-muted-foreground">- {entry.description}</span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMutation.mutate(entry.id)}
                  data-testid={`button-remove-whitelist-${entry.id}`}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No IP addresses whitelisted</p>
        )}
      </CardContent>
    </Card>
  );
}

function AbTestPanel() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [percentage, setPercentage] = useState("50");

  const { data: tests, isLoading } = useQuery<AbTestConfig[]>({
    queryKey: ["/api/ab-tests"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: { name: string; redirectUrl: string; trafficPercentage: number; isActive: boolean }) => {
      return apiRequest("POST", "/api/ab-tests", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ab-tests"] });
      setName("");
      setRedirectUrl("");
      setPercentage("50");
      toast({ title: "A/B test created", description: "The test has been created." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create A/B test.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<AbTestConfig> }) => {
      return apiRequest("PUT", `/api/ab-tests/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ab-tests"] });
      toast({ title: "A/B test updated" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/ab-tests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ab-tests"] });
      toast({ title: "A/B test deleted" });
    },
  });

  const handleCreate = () => {
    if (!name.trim() || !redirectUrl.trim()) return;
    createMutation.mutate({
      name: name.trim(),
      redirectUrl: redirectUrl.trim(),
      trafficPercentage: parseInt(percentage) || 50,
      isActive: false,
    });
  };

  if (isLoading) {
    return <div className="p-4 text-muted-foreground">Loading A/B tests...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5" />
          A/B Testing
        </CardTitle>
        <CardDescription>Test different redirect destinations for targeted countries</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 p-4 border border-border rounded-lg">
          <div className="space-y-2">
            <Label>Test Name</Label>
            <Input
              placeholder="e.g., Holiday Campaign"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-ab-name"
            />
          </div>
          <div className="space-y-2">
            <Label>Alternate Redirect URL</Label>
            <Input
              placeholder="https://example.com/landing"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              data-testid="input-ab-url"
            />
          </div>
          <div className="space-y-2">
            <Label>Traffic Percentage (0-100)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              data-testid="input-ab-percentage"
            />
            <p className="text-sm text-muted-foreground">
              Percentage of redirected users who see this variant instead of the default
            </p>
          </div>
          <Button onClick={handleCreate} disabled={createMutation.isPending} data-testid="button-create-ab">
            <Plus className="w-4 h-4 mr-1" />
            Create A/B Test
          </Button>
        </div>

        {tests && tests.length > 0 ? (
          <div className="space-y-3">
            {tests.map((test) => (
              <div key={test.id} className="flex items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium" data-testid={`text-ab-name-${test.id}`}>{test.name}</span>
                    <Badge variant={test.isActive ? "default" : "secondary"}>
                      {test.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{test.redirectUrl}</p>
                  <p className="text-xs text-muted-foreground">{test.trafficPercentage}% traffic</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={test.isActive}
                    onCheckedChange={(checked) => updateMutation.mutate({ id: test.id, data: { isActive: checked } })}
                    data-testid={`switch-ab-active-${test.id}`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(test.id)}
                    data-testid={`button-delete-ab-${test.id}`}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No A/B tests configured</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function Admin() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" />
              <span className="font-semibold text-lg">GeoGate Admin</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="config" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="config" data-testid="tab-config">
              <Settings className="w-4 h-4 mr-2" />
              Config
            </TabsTrigger>
            <TabsTrigger value="analytics" data-testid="tab-analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="whitelist" data-testid="tab-whitelist">
              <Shield className="w-4 h-4 mr-2" />
              Whitelist
            </TabsTrigger>
            <TabsTrigger value="ab-test" data-testid="tab-ab-test">
              <FlaskConical className="w-4 h-4 mr-2" />
              A/B Test
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config">
            <ConfigPanel />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsPanel />
          </TabsContent>

          <TabsContent value="whitelist">
            <WhitelistPanel />
          </TabsContent>

          <TabsContent value="ab-test">
            <AbTestPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
