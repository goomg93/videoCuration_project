import { BsEmojiSmileUpsideDown } from 'react-icons/bs';
import styles from './UsersDropDown.module.css';

const UsersDropDown = ({
  username,
  viewUserList,
  setViewUserList,
  userList,
}) => {
  return (
    viewUserList && (
      <>
        <div
          className={styles.background}
          onClick={() => setViewUserList(false)}
        />
        <div className={styles.dropdownMenu}>
          <ul className={styles.userList}>
            {userList.map(user => {
              return String(user.username) !== String(username) ? (
                <li key={user.user_id} className={styles.usernames}>
                  <BsEmojiSmileUpsideDown className={styles.avatar} />
                  {user.username}
                </li>
              ) : (
                <li
                  key={user.user_id}
                  className={styles.usernames}
                  id={styles.myUsername}
                >
                  <BsEmojiSmileUpsideDown className={styles.avatar} />
                  <span className={styles.me}>me</span>
                  {user.username}
                </li>
              );
            })}
          </ul>
        </div>
      </>
    )
  );
};

export default UsersDropDown;
