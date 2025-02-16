import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"


import RootLayout from "./pages/Root"
import HomePage from "./pages/Home"
import MenSection from "./pages/Men"
import WomenSection from "./pages/Women"
import Cart from "./pages/Cart"


const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      { path: '/', element: <HomePage /> },
      { path: '/men', element: <MenSection /> },
      { path: '/women', element: <WomenSection /> },
      { path: '/cart', element: <Cart /> },
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
