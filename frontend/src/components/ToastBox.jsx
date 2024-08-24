import { createPortal } from 'react-dom';
import { ToastContainer } from 'react-toastify';

const ToastBox = () => createPortal(<ToastContainer />, document.body);

export default ToastBox;
