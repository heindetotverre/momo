import { ERRORS } from '~~/constants/errors'
import { createPageMutation, deletePageMutation, fetchPagesQuery, fetchSinglePageQuery } from '~~/server/gql/queries/pages'
import { Page } from '~~/types/pages'
import { handleError } from '~~/utils/handleError'
import { pathParentMatch } from '~~/utils/pathParentMatch'
import { usePagesStore } from '~~/store/pages'
import { storeToRefs } from 'pinia'

export const usePages = () => {
  const { addPage, removePage, replacePages } = usePagesStore()
  const { pages } = storeToRefs(usePagesStore())

  const createPage = async (page: Page) => {
    const variables = {
      page
    }
    try {
      const { mutate: createPage } = useMutation(createPageMutation, { variables })
      const result = await createPage()
      if (result?.data) {
        const { data } = result
        addPage(data.createPage)
      }
    } catch (error) {
      return error
    }
  }

  const deletePage = async (id: String) => {
    const variables = {
      id
    }
    try {
      const { mutate: deletePage } = await useMutation(deletePageMutation, { variables })
      const result = await deletePage()
      if (result?.data) {
        const { data } = result
        removePage(data.deletePage.id)
      }
    } catch (error) {
      return error
    }
  }

  const fetchPages = async () => {
    const variables = {
      admin: true, fetchPolicy: "no-cache" 
    }
    const { data, error } = await useAsyncQuery<{ pages: Page[] }>(fetchPagesQuery, variables)
    if (error.value) {
      await handleError(error.value)
    }
    if(data.value?.pages) {
      replacePages(data.value.pages)
    }
    return pages
  }

  const fetchSinglePage = async (slug : String, pathArr : String[], fullPath : String) => {
    const variables = {
      slug, fetchPolicy: "no-cache" 
    }
    const { data, error } = await useAsyncQuery<{singlePage : Page}>(fetchSinglePageQuery, variables)
      if (error.value) {
        await handleError(error.value)
      }
      if (!isValidPath(pathArr, data.value?.singlePage)) {
        await handleError({ message: ERRORS.INVALID_SINGLE_PAGE_PARENT_TREE })
      }
      return data.value?.singlePage
  }

  return {
    createPage,
    deletePage,
    fetchPages,
    fetchSinglePage,
    pages: pages
  }
}

const isValidPath = (pathArr : String[], page : Page | undefined) : Boolean => {
  return page ? pathParentMatch(pathArr, page) : false
}