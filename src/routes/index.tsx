import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import ProductCreatePage from '@/pages/product/create';
import ProductDetailPage from '@/pages/product/detail';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import UserPage from '@/pages/user';
import OrderListPage from '@/pages/order';
import OrderDetailPage from '@/pages/order/order-detail';
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
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
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
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
