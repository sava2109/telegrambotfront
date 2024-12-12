import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './store/TaskContext';
import { Layout } from './components/Layout';
import { IdPage } from './pages/IdPage';
import { DetailsPage } from './pages/DetailsPage';
import { SuccessPage } from './pages/SuccessPage';

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<IdPage />} />
            <Route path="/details" element={<DetailsPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </Layout>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;