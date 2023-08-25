function ProtectedRoute(props) {
    const { type } = props

    switch (type) {
        case 'all':
            if (localStorage.getItem('role') === 'user'|| localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'company') {
                return props.children
            }
            return null;
        case 'user':
            if (localStorage.getItem('role') === 'user') {
                return props.children
            }
            return null;
        case 'admin':
            if (localStorage.getItem('role') === 'admin') {
                return props.children
            }
            return null;
        case 'company':
            if (localStorage.getItem('role') === 'company') {
                return props.children
            }
            return null;
        case 'companyAndUser':
            if (localStorage.getItem('role') === 'user' || localStorage.getItem('role') === 'company') {
                return props.children
            }
            return null;
        default:
            break;
    }
}

export default ProtectedRoute;