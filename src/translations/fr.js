export default {
    pos: {
        search: 'Rechercher',
        configuration: 'Configuration',
        language: 'Langue',
        theme: {
            name: 'Theme',
            light: 'Clair',
            dark: 'Obscur',
        },
    },
    resources: {
        customers: {
            name: 'Client |||| Clients',
            fields: {
                address: 'Rue',
                birthday: 'Anniversaire',
                city: 'Ville',
                commands: 'Commandes',
                first_name: 'Prénom',
                first_seen: 'Première visite',
                groups: 'Segments',
                has_newsletter: 'Abonné à la newsletter',
                has_ordered: 'A commandé',
                last_name: 'Nom',
                last_seen: 'Vu le',
                last_seen_gte: 'Vu depuis',
                latest_purchase: 'Dernier achat',
                name: 'Nom',
                total_spent: 'Dépenses',
                zipcode: 'Code postal',
            },
            tabs: {
                identity: 'Identité',
                address: 'Adresse',
                orders: 'Commandes',
                reviews: 'Commentaires',
                stats: 'Statistiques',
            },
            page: {
                delete: 'Supprimer le client',
            },
        },
        commands: {
            name: 'Commande |||| Commandes',
            fields: {
                basket: {
                    delivery: 'Frais de livraison',
                    reference: 'Référence',
                    quantity: 'Quantité',
                    sum: 'Sous-total',
                    tax_rate: 'TVA',
                    total: 'Total',
                    unit_price: 'P.U.',
                },
                customer_id: 'Client',
                date_gte: 'Passées depuis',
                date_lte: 'Passées avant',
                nb_items: 'Nb articles',
                reference: 'Référence',
                returned: 'Annulée',
                status: 'Etat',
                total_gte: 'Montant minimum',
            },
        },
        products: {
            name: 'Poster |||| Posters',
        },
        categories: {
            name: 'Catégorie |||| Catégories',
        },
        reviews: {
            name: 'Commentaire |||| Commentaires',
        },
    },
};
