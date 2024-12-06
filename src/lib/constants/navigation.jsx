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
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'cars',
		label: 'Cars',
		path: '/cars',
		icon: <HiOutlineCube />
	},
	{
		key: 'customers',
		label: 'Customers',
		path: '/customers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'reservations',
		label: 'Reservations',
		path: '/reservations',
		icon: <HiOutlineShoppingCart />
	}
]