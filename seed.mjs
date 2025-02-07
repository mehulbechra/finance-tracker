import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
dotenv.config({ path: ".env.local" });

export const categories = [
  "Salary",
  "Gift",
  "Interest",
  "Dividend",
  "Bonus",
  "Others",
  "Rent",
  "Grocery",
  "Transportation",
  "Health",
  "Education",
  "Entertainment",
  "Emergency Fund",
  "Retirement Fund",
  "Investment Fund",
];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

async function seedUsers() {
  for (let i = 0; i < 10; i++) {
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: faker.internet.email(),
        password: "password",
      });
      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      console.error("Error inserting data");
    }
  }
}

async function getUserIds() {
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error("Error listing users");
    return;
  }
  return users?.map((user) => user.id);
}

async function seed() {
  await seedUsers();
  const userIds = await getUserIds();

  let transactions = [];

  for (let i = 0; i < 100; i++) {
    const created_at = faker.date.past();
    let type,
      category = null;
    const userId = faker.helpers.arrayElement(userIds);

    const typeBias = Math.random();

    if (typeBias < 0.8) {
      type = "Expense";
      category = faker.helpers.arrayElement(categories);
    } else if (typeBias < 0.9) {
      type = "Income";
    } else {
      type = faker.helpers.arrayElement(["Saving", "Investment"]);
    }

    let amount;
    switch (type) {
      case "Income":
        amount = faker.number.int({
          min: 2000,
          max: 9000,
        });
        break;
      case "Expense":
        amount = faker.number.int({
          min: 10,
          max: 1000,
        });
        break;
      case "Investment":
      case "Saving":
        amount = faker.number.int({
          min: 3000,
          max: 10000,
        });
        break;
    }

    transactions.push({
      created_at,
      amount,
      type,
      description: faker.lorem.sentence(),
      category,
      user_id: userId,
    });
  }

  const { error } = await supabase.from("transactions").insert(transactions);

  if (error) {
    console.error("Error inserting data");
  } else {
    console.log(`${transactions.length} transactions inserted`);
  }
}

seed().catch(console.error);
