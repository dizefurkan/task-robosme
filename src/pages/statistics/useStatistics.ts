import { useEffect, useState } from "react";
import API from "../../config/api";

import type { Data as Post } from "../post-list/useList";

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

type Data = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
};

function useStatistics() {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersPromise, postsPromise] = await Promise.all([
          fetch(API.baseUrl + API.users),
          fetch(API.baseUrl + API.posts),
        ]);

        const users = await usersPromise.json();
        const posts = await postsPromise.json();

        const userPostsCount: number[] = users.map((user: User) => {
          return posts.filter((post: Post) => post.userId === user.id).length;
        });

        const labels: string[] = users.map((user: User) => user.name);

        const _data = {
          labels: labels,
          datasets: [
            {
              label: "Posts per User",
              data: userPostsCount,
              backgroundColor: labels.map((_, index) => {
                const colors = [
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(54, 162, 235, 0.5)",
                  "rgba(255, 206, 86, 0.5)",
                  "rgba(75, 192, 192, 0.5)",
                  "rgba(153, 102, 255, 0.5)",
                  "rgba(255, 159, 64, 0.5)",
                ];
                return colors[index % colors.length];
              }),
              borderColor: labels.map((_, index) => {
                const colors = [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ];
                return colors[index % colors.length];
              }),
              borderWidth: 1,
            },
          ],
        };

        setData(_data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return { data };
}

export default useStatistics;
