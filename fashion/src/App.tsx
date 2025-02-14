import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

import RootLayout from "./pages/Root"
import HomePage from "./pages/Home"


const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      { path: '/', element: <HomePage /> }
    ]
  }

])

const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
}


export default App
