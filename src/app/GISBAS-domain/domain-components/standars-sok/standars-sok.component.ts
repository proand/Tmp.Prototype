import { Component, inject } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SpinnerComponent } from '@app/shared/components/spinner/spinner.component';
import { NavigationService } from '@app/shared/navigation.service';
import { GisbasViewStateService } from '@GISBAS_CONNECT/gisbas-view-state.service';

interface Sokeresultat {
  Navn: string;
  TypeInfokort: string;
  Gruppetype: string;
  Synonym: string;
  Kategori: string;
  Status: string;
  InfokortLink: string;
}

@Component({
  selector: 'app-standars-sok',
  imports: [SharedModule, SpinnerComponent],
  templateUrl: './standars-sok.component.html',
  styleUrl: './standars-sok.component.scss',
})
export class StandarsSokComponent {
  private gisbasViewStateService = inject(GisbasViewStateService);
  private navigationService = inject(NavigationService);

  showStandarsSok = false;
  soketerm = '';
  sokeresultat: Sokeresultat[] | null = null;

  constructor() {
    setTimeout(() => {
      this.gisbasViewStateService.addContentFromDomainDataToViewState({
        id: 101,
        title: 'Full tittel for innhold med id 101',
        shortTitle: 'Short-101',
        parentLayoutRootTitle: '20250313-2',
      });

      this.showStandarsSok = true;
    }, 1000);
  }

  sok(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sokeresultat = this.getSokeresultat(this.soketerm);
    } else {
      this.sokeresultat = null;
    }
  }

  navigate(routerLink: string) {
    this.navigationService.navigate(routerLink);
  }

  getSokeresultat(soketerm: string): Sokeresultat[] | null {
    soketerm = soketerm.slice(0, 4);

    console.log('soketerm', soketerm);

    switch (soketerm) {
      case 'para':
        return [
          {
            Navn: 'Paracet',
            TypeInfokort: 'Produkt',
            Gruppetype: 'Analgetica, paracetamolholdige',
            Synonym: '',
            Kategori: 'Legemiddel',
            Status: 'Godkjent',
            InfokortLink: '0/2',
          },
          {
            Navn: 'Paracetamol',
            TypeInfokort: 'Kjemisk forbindelse',
            Gruppetype: '',
            Synonym: 'Acetaminophen, N-acetyl-aminofenol',
            Kategori: 'Kjemisk forbindelse',
            Status: 'Godkjent',
            InfokortLink: 'TODO',
          },
        ];

      case 'ibux':
        return [
          {
            Navn: 'Ibux',
            TypeInfokort: 'Produkt',
            Gruppetype: 'NSAIDS',
            Synonym: '',
            Kategori: 'Legemiddel',
            Status: 'Godkjent',
            InfokortLink: 'TODO',
          },
          {
            Navn: 'Ibux gel',
            TypeInfokort: 'Legemiddel',
            Gruppetype: 'Analgetika yil utvortes bruk, NSAIDS',
            Synonym: '',
            Kategori: 'Legemiddel',
            Status: 'Godkjent',
            InfokortLink: 'TODO',
          },
        ];

      default:
        return [];
    }
  }
}
