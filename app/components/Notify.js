import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const notify = (txt, type) => {
  if (txt && type) {
    switch (type) {
      case 'success':
        toast.success(txt);
        break;
      case 'warn':
        toast.warn(txt);
        break;
      case 'error':
        toast.error(txt);
        break;
      default:
        toast(txt);
    }
  }
};
export default notify;
