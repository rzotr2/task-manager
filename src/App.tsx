import './App.css';
import PageHeader from "./components/PageHeader.tsx";
import PageMain from "./components/PageMain.tsx";
import PageFooter from "./components/PageFooter.tsx";

export default function App() {

      return (
          <>
              <div className="min-w-screen min-h-screen flex flex-col justify-between">
                  <PageHeader />
                  <PageMain />
                  <PageFooter />
              </div>
          </>
      )
}
