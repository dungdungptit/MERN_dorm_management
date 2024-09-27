import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <h1>Chào mừng đến với ứng dụng quản lý ký túc xá</h1>
      <nav>
        <ul>
          <li><Link to="/students">Quản lý sinh viên</Link></li>
          <li><Link to="/guests">Quản lý khách</Link></li>
          <li><Link to="/rooms">Quản lý phòng</Link></li>
          <li><Link to="/services">Quản lý dịch vụ</Link></li>
          <li><Link to="/parking">Quản lý bãi đỗ xe</Link></li>
          <li><Link to="/queries">Truy vấn</Link></li></ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
