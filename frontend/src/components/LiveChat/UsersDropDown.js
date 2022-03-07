import styles from './UsersDropDown.module.css';

const UsersDropDown = ({ username, viewUserList, userList }) => {
  return (
    viewUserList && (
      <div className={styles.dropdownMenu}>
        <ul className={styles.userList}>
          {userList.map(user => {
            return String(user.username) !== String(username) ? (
              <li key={user.user_id}>{user.username}</li>
            ) : (
              <li key={user.user_id} id={styles.myUsername}>
                {user.username}(나)
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default UsersDropDown;
