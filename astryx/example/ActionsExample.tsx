import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Theme} from '@astryxdesign/core/theme';
import {AlertDialog} from '@astryxdesign/core/AlertDialog';
import {Dialog} from '@astryxdesign/core/Dialog';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {antaraxYaraoneTheme} from './themes/yaraone/antarax-yaraone';

function L3() {
  const [name, setName] = useState('Sinar Digi');
  return (
    <Dialog isOpen isInline onOpenChange={() => {}} width={360}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12, padding: 20}}>
        <h2 style={{margin: 0, fontSize: 18}}>Delete Sinar Digital?</h2>
        <p style={{margin: 0}}>This deletes 18 projects, 412 tickets and 96 client contacts.</p>
        <TextInput label="Type Sinar Digital to confirm" value={name} onChange={setName} />
        <TextInput label="Your password" type="password" value="hunter2hunter2" onChange={() => {}} />
        <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
          <Button label="Cancel" variant="ghost" onClick={() => {}} />
          <Button label="Delete Sinar Digital" variant="destructive" isDisabled={name !== 'Sinar Digital'} onClick={() => {}} />
        </div>
      </div>
    </Dialog>
  );
}

function App() {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 380px)', gap: 24, padding: 24, background: 'var(--color-background-body)'}}>
      <AlertDialog isOpen isInline onOpenChange={() => {}} title="Remove Daniel Ong?" description="Daniel Ong loses access to Sinar Digital at once. Their work stays, under their name." actionLabel="Remove Daniel Ong" onAction={() => {}} />
      <L3 />
      <Dialog isOpen isInline onOpenChange={() => {}} width={360}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12, padding: 20}}>
          <h2 style={{margin: 0, fontSize: 18}}>Importing 312 contacts</h2>
          <ProgressBar label="Importing 312 contacts" value={78} max={312} hasValueLabel formatValueLabel={(v, m) => `${v} of ${m}`} />
          <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
            <Button label="Cancel" variant="secondary" onClick={() => {}} />
            <Button label="Run in background" variant="primary" onClick={() => {}} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
createRoot(document.getElementById('root')!).render(<Theme theme={antaraxYaraoneTheme}><App /></Theme>);
