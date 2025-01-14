import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import ProductCreatePage from '@/pages/product/create';
import ProductDetailPage from '@/pages/product/detail';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import UserPage from '@/pages/user';
import OrderListPage from '@/pages/order';
import OrderDetailPage from '@/pages/order/order-detail';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import UserNav from '@/components/shared/user-nav';
const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const StudentPage = lazy(() => import('@/pages/students'));
const StudentDetailPage = lazy(
  () => import('@/pages/students/StudentDetailPage')
);

const ProductPage = lazy(() => import('@/pages/product'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const isLogged = useSelector((state: RootState) => state.auth.isLoggedIn);

  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <UserNav />
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'student',
          element: <StudentPage />
        },
        {
          path: 'student/details',
          element: <StudentDetailPage />
        },
        {
          path: 'form',
          element: <FormPage />
        },
        {
          path: 'product',
          element: <ProductPage />
        },
        {
          path: 'product/:id',
          element: <ProductDetailPage />
        },
        {
          path: 'product/create',
          element: <ProductCreatePage />
        },
        {
          path: 'user',
          element: <UserPage />
        },
        {
          path: 'order',
          element: <OrderListPage />
        },
        {
          path: 'order/:orderId',
          element: <OrderDetailPage />
        },
        {
          path: '/404',
          element: <NotFound />
        },
        {
          path: '*',
          element: <Navigate to="/404" replace />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    }
  ];

  const routes = useRoutes(dashboardRoutes);
  const unAuthRoutes = useRoutes(publicRoutes);

  return isLogged ? routes : unAuthRoutes;
}
