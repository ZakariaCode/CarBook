import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'cars',
		label: 'Cars',
		path: '/admin/cars',
		icon: <HiOutlineCube />
	},
	{
		key: 'customers',
		label: 'Customers',
		path: '/admin/customers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'reservations',
		label: 'Reservations',
		path: '/admin/reservations',
		icon: <HiOutlineShoppingCart />
	}
]