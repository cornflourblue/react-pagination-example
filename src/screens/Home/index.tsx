import React, { useState } from 'react';
import Pagination from '../../components/Pagination';

import styles from './styles.module.scss';

interface Item {
  id: number, name: string
}

function Home() {
  const TEST = [...Array(20).keys()].map((i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

  const [items, setItems] = useState<Item[]>([]);

  return (
    <div className={styles.container}>
      {items.map((a) => <p key={Math.random()}>{a.name}</p>)}
      <Pagination items={TEST as never[]} onChangePage={(a) => setItems(a)} />
    </div>
  );
}

export default Home;
