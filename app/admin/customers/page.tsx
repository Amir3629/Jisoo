'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/admin/ui/page-header'
import { adminCustomers } from '@/lib/admin/data'

export default function AdminCustomersPage() {
  const topCustomers = adminCustomers.slice(0, 20)

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description="Customer overview, profile health, and engagement signals." breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Customers' }]} />
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Email</th>
                  <th className="py-2 pr-3">Tier</th>
                  <th className="py-2 pr-3">Orders</th>
                  <th className="py-2 pr-3">LTV</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b last:border-0">
                    <td className="py-2 pr-3 font-medium">{customer.firstName} {customer.lastName}</td>
                    <td className="py-2 pr-3">{customer.email}</td>
                    <td className="py-2 pr-3 capitalize">{customer.tier}</td>
                    <td className="py-2 pr-3">{customer.orderCount}</td>
                    <td className="py-2 pr-3">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(customer.totalSpent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
