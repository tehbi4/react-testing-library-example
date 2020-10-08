import React from 'react';
import { Button } from './components/Button';
import { Greeting } from './components/Greeting';

import styles from './App.module.css';
import { getUserName } from './services/getUserName';

enum FetchStatus {
  Idle,
  Loading,
  Success,
  Fail,
}

type UserData =
  | {
      status: FetchStatus.Success;
      name: string;
    }
  | {
      status: Exclude<FetchStatus, FetchStatus.Success>;
      name?: undefined;
    };

export const App: React.FC = () => {
  const [isGreetingShown, showGreeting] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<UserData>({
    status: FetchStatus.Idle,
  });

  const greetUser = async () => {
    // just toogle greeting if user name has already been loaded
    if (user.status === FetchStatus.Success) {
      showGreeting(!isGreetingShown);
      return;
    }

    // fetch user name and show greeting in success case
    setUser({ status: FetchStatus.Loading });
    try {
      const response = await getUserName();
      setUser({ status: FetchStatus.Success, name: response });
      showGreeting(true);
    } catch {
      setUser({ status: FetchStatus.Fail });
    }
  };

  return (
    <div className={styles.App}>
      <Button onClick={greetUser}>Click me</Button>
      {isGreetingShown && <Greeting userName={user.name} />}
    </div>
  );
};
