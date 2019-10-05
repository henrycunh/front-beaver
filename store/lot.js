import LotDataMockup from '@/assets/lot-data-mock'

export const state = () => ({
    lots: null,
    current: null
})

export const getters = {
    flawedLots: (state) => {
        if (!state.lots) return []
        const lotStageList = []
        for (const { _id, color, stages } of state.lots) {
            for (const stage of stages) {
                for (const variable of stage.variables) {
                    if (variable.error > .1 || variable.error < -.1) {
                        lotStageList.push({
                            variable,
                            lot: {
                                _id, color
                            }
                        })
                    }
                }
            }
        }
        return lotStageList
    }
}

export const mutations = {

    SET_CURRENT(state, lot) {
        state.current = lot
    },

    SET_LOTS(state, lots) {
        state.lots = lots
    },

    UPDATE_LOT(state, lot) {
        state.lots = state.lots.map(__lot => __lot._id === lot._id ? lot : __lot)
    }

}

export const actions = {

    setCurrent({ commit }, lot) {
        commit('SET_CURRENT', lot)
    },

    setLots({ commit }, lots) {
        commit('SET_LOTS', lots)
    },

    updateLot({ commit }, lot) {
        commit('UPDATE_LOT', lot)
    }

}