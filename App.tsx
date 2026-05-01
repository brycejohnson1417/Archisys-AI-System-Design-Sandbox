import React from 'react';
import { FlowEditor } from './components/flow/FlowEditor';

const App: React.FC = () => {
  return (
    <div className="w-full h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      <FlowEditor />
    </div>
  );
};

export default App;
