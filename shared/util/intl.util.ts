import Cze from '@shared/lib/intl/cz.json'
import Eng from '@shared/lib/intl/en.json'
import Fra from '@shared/lib/intl/fr.json'
import Ger from '@shared/lib/intl/de.json'
import Ita from '@shared/lib/intl/it.json'
import Nld from '@shared/lib/intl/nl.json'

export const messageByLocale = (language: string) => {
  switch (language) {
    case 'cz':
      return Cze
    case 'de':
      return Ger
    case 'en':
      return Eng
    case 'fr':
      return Fra
    case 'it':
      return Ita
    case 'nl':
      return Nld
    default:
      return Eng
  }
}
