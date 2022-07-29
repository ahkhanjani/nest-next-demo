import styles from './StudentDatePicker.module.css';

const timezone = 'Asia/Tehran';

const StudentDataPicker: React.FC = () => {
  return (
    <div className={styles['container']}>
      <h3>Available Sessions</h3>
      <span>In your local timezone({timezone})</span>
      <a href="/#">Update</a>
    </div>
  );
};
export default StudentDataPicker;

const DateBlock: React.FC = () => {
  return <></>;
};
