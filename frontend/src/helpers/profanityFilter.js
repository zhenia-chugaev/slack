import filter from 'leo-profanity';

filter.add(
  filter.getDictionary('ru'),
  filter.getDictionary('fr'),
);

export default filter;
