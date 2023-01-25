import ReactDOM from 'react-dom';
import { Product } from '../../App';

interface ModalProps {
  onClose: Function;
  item: Product | undefined;
}

export const Modal = ({ onClose, item }: ModalProps) => {
  return ReactDOM.createPortal(
    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: '20px',
        position: 'fixed',
        left: '0',
        top: '0',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
      }}
      onClick={() => onClose()}
    >
      <table
        style={{ backgroundColor: 'green' }}
        onClick={(evt) => evt.stopPropagation()}
      >
        <thead>
          <tr>
            {Object.keys(item!).map((key) => (
              <td key={key}>{key}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(item!).map((value) => (
              <td key={value}>{value}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>,
    document.getElementById('root')!
  );
};
