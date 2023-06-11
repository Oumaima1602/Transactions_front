import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {
  constructor(private http: HttpClient) { }
  transaction: any = {}; // Déclaration de l'objet transaction
  transactions: any = {};
  updatedTransaction: any = {}; 

  ngOnInit() {
    this.fetchTransactions();
    this.onSubmit();
  }

  onSubmit() {
    // Envoyer les données du formulaire au backend via une requête POST
    this.http.post('/api/transactions', this.transaction).subscribe(
      (response) => {
        // Traiter la réponse du backend
        console.log('Transaction créée avec succès !');
        console.log('Montant :', this.transaction.amount);
        console.log('Type de transaction :', this.transaction.type);
      },
      (error) => {
        // Gérer les erreurs de la requête
        console.error('Erreur lors de la création de la transaction :', error);
      }
    );
  }

  fetchTransactions() {
    this.http.get('/api/transactions').subscribe(
      (data) => {
        this.transactions = data; // Stocker les transactions récupérées dans une variable du composant
        console.log('Données récupérées avec succès :', data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }

  onUpdateTransaction(transactionId: number) {
    this.http.put('/api/transactions/' + transactionId, updatedTransaction).subscribe(
      (response) => {
        // Traiter la réponse du backend
        console.log('Transaction mise à jour avec succès !');
      },
      (error) => {
        // Gérer les erreurs de la requête
        console.error('Erreur lors de la mise à jour de la transaction :', error);
      }
    );
  }

  onDeleteTransaction(transactionId: number) {
  this.http.delete('/api/transactions/' + transactionId).subscribe(
    (response) => {
      // Traiter la réponse du backend
      console.log('Transaction supprimée avec succès !');
    },
    (error) => {
      // Gérer les erreurs de la requête
      console.error('Erreur lors de la suppression de la transaction :', error);
    }
  );
  
  }
  
}
