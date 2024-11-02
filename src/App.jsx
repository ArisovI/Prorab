import {
  Route,
  Routes,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Cookies from "js-cookie";
import Layout from "./components/Layout";
import Login from "./pages/Login.jsx";
import Homepage from "./pages/Homepage.jsx";
import Contacts from "./pages/Contacts.jsx";
import Details from "./pages/Details.jsx";
import Photos from "./pages/Photos.jsx";
import Documents from "./pages/Documents.jsx";
import FirstPage from "./pages/FirstPage.jsx";
import WorkerHomepage from "./pages/WorkerHomepage.jsx";
import ManagerFirstpage from "./pages/managerPages/ManagerFirstpage.jsx";
import ManagerSecond from "./pages/managerPages/ManagerSecond.jsx";
import ManagerRole from "./pages/managerPages/ManagerRole.jsx";
import ManagerFourth from "./pages/managerPages/ManagerFourth.jsx";
import ManagerFifthpage from "./pages/managerPages/ManagerFifthpage.jsx";
import ManagerSixth from "./pages/managerPages/ManagerSixth.jsx";
import State from "./pages/State.jsx";
import WorkerCharspage from "./pages/workerPages/WorkerCharspage.jsx";
import ManagerSeven from "./pages/managerPages/ManagerSeven.jsx";
import WorkerStadepage from "./pages/workerPages/WorkerStadepage.jsx";
import WorkerDetailpage from "./pages/workerPages/WorkerDetailpage.jsx";
import ManagerPhotopage from "./pages/managerPages/ManagerPhotopage.jsx";
import ManagerPhotodetail from "./pages/managerPages/ManagerPhotodetail.jsx";
import WorkerDocumentFolder from "./pages/workerPages/WorkerDocumentFolder.jsx";
import WorkerDocumentDetail from "./pages/workerPages/WorkerDocumentDetail.jsx";
import ManagerPermissions from "./pages/managerPages/ManagerPermissions.jsx";
import { HomeProrab } from "./pages/prorab/Home";
import { AddDesc } from "./pages/prorab/AddDesc";
import { RefreshState } from "./pages/prorab/ResfreshStage";
import { WorkerDetailPage as WorkerDetailPageProrab } from "./pages/prorab/WorkerDetailPage";
import { AddPhoto } from "./pages/prorab/AddPhoto";
import { AddPhotoFolder } from "./pages/prorab/AddPhotoFolder";
import { AddDocumentsFolder } from "./pages/prorab/AddDocumentsFolder";
import { AddDocuments } from "./pages/prorab/AddDocuments";

// Компонент для защиты маршрутов
const PrivateRoute = ({ allowedRoles }) => {
  const authData = Cookies.get("authData");

  if (!authData) {
    return <Navigate to="/" />;
  }

  const { claims } = JSON.parse(authData);
  const userRole = claims.role;

  if (!allowedRoles.includes(userRole)) {
    if (userRole === "client") {
      return <Navigate to="/homepage" />;
    } else if (userRole === "manager") {
      return <Navigate to="/managerFirstpage" />;
    } else if (userRole === "worker") {
      return <Navigate to="/workerHomepage" />;
    }
  }

  return <Outlet />;
};

function App() {
  return (
    <>
      <Routes>
        {/* Публичный маршрут логина */}
        <Route path="/" element={<Login />} />

        {/* Защищённые маршруты с Layout для всех ролей */}
        <Route path="/" element={<Layout />}>
          {/* Общедоступные маршруты для всех авторизованных ролей */}
          <Route
            element={
              <PrivateRoute allowedRoles={["client", "manager", "worker"]} />
            }
          >
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/firstPage" element={<FirstPage />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/details" element={<Details />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/state" element={<State />} />
            <Route path="/documents" element={<Documents />} />
          </Route>

          {/* Защищённые маршруты для менеджеров */}
          <Route element={<PrivateRoute allowedRoles={["manager"]} />}>
            <Route path="/managerFirstpage" element={<ManagerFirstpage />} />
            <Route path="/managerSecondpage" element={<ManagerSecond />} />
            <Route path="/managerThirdPage" element={<ManagerRole />} />
            <Route path="/managerFourthPage" element={<ManagerFourth />} />
            <Route path="/managerFifthPage" element={<ManagerFifthpage />} />
            <Route path="/managerSixthPage" element={<ManagerSixth />} />
            <Route path="/managerSevenPage" element={<ManagerSeven />} />
            <Route path="/managerPhotopage" element={<ManagerPhotopage />} />
            <Route
              path="/managerPhotodetail"
              element={<ManagerPhotodetail />}
            />
            <Route
              path="/managerPermissions"
              element={<ManagerPermissions />}
            />
          </Route>

          {/* Защищённые маршруты для работников */}
          <Route element={<PrivateRoute allowedRoles={["worker"]} />}>
            <Route path="/workerHomepage" element={<WorkerHomepage />} />
            <Route path="/workerCharsPage" element={<WorkerCharspage />} />
            <Route path="/workerStadePage" element={<WorkerStadepage />} />
            <Route path="/workerDetailPage" element={<WorkerDetailpage />} />
            <Route path="/workerPhotoPage" element={<ManagerPhotopage />} />
            <Route
              path="/workerPhotoDetailPage"
              element={<ManagerPhotodetail />}
            />
            <Route
              path="/workerDocumentFolderPage"
              element={<WorkerDocumentFolder />}
            />
            <Route
              path="/workerDocumentDetailPage"
              element={<WorkerDocumentDetail />}
            />
          </Route>
        </Route>
        <Route path="/prorab" element={<HomeProrab />}>
          <Route path="add-description" element={<AddDesc />} />
          <Route path="resfresh-stage" element={<RefreshState />} />
          <Route path="update-stage" element={<WorkerDetailPageProrab />} />
          <Route path="add-photo-folder" element={<AddPhotoFolder />} />
          <Route path="add-photo" element={<AddPhoto />} />
          <Route path="add-documents-folder" element={<AddDocumentsFolder />} />
          <Route path="add-documents" element={<AddDocuments />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
