import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import { client } from '@/libs/client';
import type { Blog } from '@/types/blog';

type Props = {
  blogs: Blog[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.get({ endpoint: 'blog' });

  return {
    props: {
      blogs: data.contents,
    },
  };
};

const Home: NextPage<Props> = ({ blogs }) => {
  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
