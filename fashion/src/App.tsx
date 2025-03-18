import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "./backendItems/supabaseData"
import RootLayout from "./pages/Root"
import HomePage from "./pages/Home"
import MenSection from "./pages/Men"
import WomenSection from "./pages/Women"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      { path: '/', element: <HomePage /> },
      { path: '/men', element: <MenSection /> },
      { path: '/women', element: <WomenSection /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
    ]
  }

])


function App() {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
}


export default App
