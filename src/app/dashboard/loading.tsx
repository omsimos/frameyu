import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardSkeleton() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger disabled value="all">
              All
            </TabsTrigger>
            <TabsTrigger disabled value="active">
              Active
            </TabsTrigger>
            <TabsTrigger disabled value="draft">
              Draft
            </TabsTrigger>
            <TabsTrigger disabled value="private" className="hidden sm:flex">
              Private
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 w-8 sm:w-auto">
            <Skeleton className="hidden h-4 w-12 sm:inline-block" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 sm:w-auto">
            <Skeleton className="hidden h-4 w-12 sm:inline-block" />
          </Button>
          <Button size="sm" className="h-8 w-24 sm:w-auto">
            <Skeleton className="hidden h-4 w-24 sm:inline-block" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <Card className="w-full">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                  <Skeleton className="ml-auto h-4 w-[100px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="flex xl:flex-col sm:flex-row flex-col gap-4 flex-none xl:max-w-sm">
          <Card className="w-full">
            <CardHeader>
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
            <CardFooter>
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
            <CardFooter>
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
