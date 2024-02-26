import Head from "next/head";
import { DashboardLayout } from "../components/dashboard-layout";
import { CashWithdraw } from "../components/settings/cash-withdraw";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { CashDeposit } from "../components/settings/cash-deposit";

function Page() {
  return (
    <>
      <Head>
        <title>Portfolio Management | Banker Inc.</title>
      </Head>
      <Tabs>
        <TabList>
          <Tab>Deposit</Tab>
          <Tab>Withdraw</Tab>
        </TabList>

        <TabPanel>
          <CashDeposit />
        </TabPanel>
        <TabPanel>
          <CashWithdraw />
        </TabPanel>
      </Tabs>
    </>
  );
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
