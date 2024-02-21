import { test, expect } from '@playwright/test';

const UI_URL='http://127.0.0.1:5173/'

test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link",{name:"Sign In"}).click();

  await expect(page.getByRole("heading",{name:'Sign In'})).toBeVisible()

  await page.locator("[name=email]").fill('hassan@gmail.com');
  await page.locator("[name=password]").fill('12345678');

  await page.getByRole("button",{name:"SignIn"}).click();

  await expect(page.getByText('User login Successfully')).toBeVisible();
  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible();
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
  await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible();
});

test('should allow user to register', async({page})=>{
  const userEmail=`test${Math.floor(Math.random() * 90000) + 10000}@test.com`;
  await page.goto(UI_URL);

  await page.getByRole("link",{name: 'Sign In'}).click();
  await page.getByRole("link",{name:'Create an account here'}).click();
  await expect(page.getByRole('heading',{name:'Create An Account'})).toBeVisible();

  await page.locator("[name=fName]").fill('test_fname')
  await page.locator("[name=lName]").fill('test_lname')
  await page.locator("[name=email]").fill(userEmail)
  await page.locator("[name=password]").fill('12345678');
  await page.locator("[name=confirmPassword]").fill('12345678');

  await page.getByRole("button",{name:'Create Account'}).click();

  await expect(page.getByText('Registration Success!')).toBeVisible();
  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible();
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
  await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible();
})