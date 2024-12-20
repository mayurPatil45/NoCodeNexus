import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
          <Card className="w-full max-w-2xl shadow-lg">
            <CardContent className="pt-12 pb-10 px-6 text-center">
              {/* Error Code and Illustration */}
              <div>
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <div className="mt-4 text-muted-foreground">
                  <svg
                    className="mx-auto h-32 w-32"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Error Message */}
              <div className="mt-6">
                <h2 className="text-3xl font-semibold tracking-tight">Page not found</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Sorry, we couldn&apos;t find the page you&apos;re looking for.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/')}
                  className="gap-2"
                  size="lg"
                >
                  <Home className="h-5 w-5" />
                  Back to Home
                </Button>
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="gap-2"
                  size="lg"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NotFound;