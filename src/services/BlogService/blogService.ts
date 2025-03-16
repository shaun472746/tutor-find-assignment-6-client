'use server';

export const getNewsItemsService = async (value: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/student/get-all-newslist/${value}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
