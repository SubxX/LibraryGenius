import { Button } from '@web/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@web/ui/card';
import { Input } from '@web/ui/input';
import { Label } from '@web/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@web/ui/tabs';

export default function App() {
  return (
    <div className="min-h-screen flex-center p-4">
      <div className="w-full max-w-sm">
        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Signin</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Signin</CardTitle>
                <CardDescription>
                  Login into your existing account to access your student
                  dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="Enter your password" />
                </div>
              </CardContent>
              <CardFooter className="w-full">
                <Button>Signin</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Sigup</CardTitle>
                <CardDescription>
                  Create new account to get books from library & access your
                  dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Enter name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new_email">Email</Label>
                  <Input
                    id="new_email"
                    type="email"
                    placeholder="Enter email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new_password">Current password</Label>
                  <Input
                    id="new_password"
                    type="password"
                    placeholder="Enter password"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cnf_password">Confirm password</Label>
                  <Input
                    id="cnf_password"
                    type="password"
                    placeholder="Re enter password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Signup</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
