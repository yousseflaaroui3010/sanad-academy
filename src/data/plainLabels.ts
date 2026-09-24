// The lessons tag sentences with [Invariant], [Convention]… Beginners read plain labels instead.
const LABELS: [RegExp, string][] = [
  [/\[Invariant (du code|actuel|du code fusionné|du contrat|des données|observé dans le rapport|mathématique|de mesure)\]/g, 'Toujours vrai :'],
  [/\[Invariant\]/g, 'Toujours vrai :'],
  [/\[Convention du projet\]/g, 'Choix de l’équipe :'],
  [/\[Convention\]/g, 'Choix de l’équipe :'],
  [/\[Règle de prudence\]/g, 'Prudence :'],
  [/\[Règle de méthode\]/g, 'Méthode :'],
];

export function plainLabels(text: string): string {
  return LABELS.reduce((result, [pattern, label]) => result.replace(pattern, label), text);
}
