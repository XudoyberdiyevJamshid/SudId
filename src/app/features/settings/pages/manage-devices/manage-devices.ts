import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GIcon } from '../../../../shared/components/g-icon/g-icon';
import { GCard } from '../../../../shared/components/g-card/g-card';
import { NoData } from '../../../../shared/ui/no-data/no-data';
import { DeviceSessionService } from '../../../../core/services/device/device.service';

export interface Session {
  id: string;
  type: 'laptop' | 'smartphone';
  name: string;
  lastActive: string;
  isCurrent: boolean;
}

@Component({
  selector: 'app-manage-devices',
  imports: [GIcon, GCard, NoData],
  templateUrl: './manage-devices.html',
  styleUrl: './manage-devices.scss',
})
export class ManageDevices implements OnInit {
  router = inject(Router);
  deviceSessionService = inject(DeviceSessionService);

  allSessions = signal<Session[]>([
    { id: '1', type: 'laptop', name: 'PC-Windows-11', lastActive: '15.10.2025', isCurrent: true },
    { id: '2', type: 'laptop', name: 'PC-Windows-11', lastActive: '15.10.2025', isCurrent: false },
    { id: '3', type: 'laptop', name: 'Laptop-MacOS', lastActive: '20.10.2025', isCurrent: false },
    {
      id: '4',
      type: 'smartphone',
      name: 'Tablet-Android',
      lastActive: '25.10.2025',
      isCurrent: false,
    },
  ]);

  activeSession = computed(() => this.allSessions().filter((s) => s.isCurrent));
  otherSessions = computed(() => this.allSessions().filter((s) => !s.isCurrent));

  isModalOpen = signal(false);
  selectedSession = signal<Session | null>(null);

  goBack() {
    this.router.navigate(['/dashboard/settings']);
  }

  openModal(session: Session) {
    this.selectedSession.set(session);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedSession.set(null);
  }

  confirmCloseSession() {
    const sessionToRemove = this.selectedSession();
    if (sessionToRemove) {
      this.allSessions.update((sessions) => sessions.filter((s) => s.id !== sessionToRemove.id));
    }
    this.closeModal();
  }

  handeleData() {
    this.deviceSessionService.getAllSessions('userid').subscribe({
      next: (response: any) => {
        const data = response?.data || response;
        this.allSessions.set(data);
      },
      error: (err) => {
        console.error('Sessiyalarni yuklashda xato:', err);
      },
    });
  }
  ngOnInit(): void {}
}
